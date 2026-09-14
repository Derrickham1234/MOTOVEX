import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// System instructions for MOTOVEX AI Assistant roles
const SYSTEM_INSTRUCTIONS = {
  concierge: `You are the MOTOVEX Marketplace Concierge, an institutional vehicle and equipment specialist on MOTOVEX Exchange — the premier global marketplace for luxury vehicles, heavy machinery, agricultural equipment, motorcycles, commercial fleets, and marine vessels.
Your tone is professional, knowledgeable, authoritative yet approachable, and focused on institutional-grade vehicle acquisition.
Key marketplace details to reference when relevant:
- Standard Escrow Fee: 5.0% institutional custody guarantee (segregated Tier-3 bank vault).
- Every asset features physical CAN-bus telemetry auditing, chassis integrity laser scans, and verified clean legal titles.
- Supported sectors: Cars & SUVs (e.g. Land Cruiser 300 GR Sport), Heavy Machinery (e.g. CAT 320 Excavators), Agri Tech (e.g. John Deere 8R 370 with GPS), Motorcycles (e.g. Yamaha Ténéré 700 Rally), Commercial Haulage (e.g. Scania 770S V8), Marine (e.g. Axopar 37 Sun-Top), and EVs.
- Provide concise, practical advice on specs, pricing fairness, import duty calculations, and escrow procedures.`,

  auditor: `You are the MOTOVEX Senior Telemetry & Mechanical Forensic Auditor. You specialize in vehicle and heavy plant diagnostics: CAN-bus SAE J1939 protocols, engine cylinder compression analysis, hydraulic pump flow rates (L/min), OBD-II diagnostic trouble code (DTC) analysis, and frame laser alignment.
Explain technical issues clearly to prospective buyers, interpret sensor readings, diagnose warning indicators, and evaluate physical wear and tear vs metered hours/odometer.`,

  escrow: `You are the MOTOVEX Chief Escrow & Custody Officer. You specialize in institutional financial settlement and legal title transfer for high-value vehicular assets.
Key Escrow Protocol details:
- Phase 1 (Capital Locked): Buyer funds are held in a segregated institutional trust account.
- Phase 2 (Physical Telemetry Verification): Field engineer verifies physical chassis, CAN-bus health, and odometer.
- Phase 3 (Legal Title Handover): Clean title & logbook verification through official registries (e.g., NTSA Kenya, cross-border transit corridors).
- Phase 4 (Settlement & Disbursement): Funds released to seller upon verified physical handover. 0% counterparty default risk.`
};

// Chat endpoint
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { messages, role = "concierge", model = "gemini-3.8-flash", assetContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
    }

    // Select system instruction based on role
    const baseInstruction = SYSTEM_INSTRUCTIONS[role as keyof typeof SYSTEM_INSTRUCTIONS] || SYSTEM_INSTRUCTIONS.concierge;
    let fullSystemInstruction = baseInstruction;

    if (assetContext && typeof assetContext === "object") {
      fullSystemInstruction += `\n\nCURRENT ASSET CONTEXT BEING INQUIRED ABOUT:\nTitle: ${assetContext.title || "Unknown"}\nVIN: ${assetContext.vin || "N/A"}\nReserve: ${assetContext.reservePrice || "N/A"}\nSpecs: ${JSON.stringify(assetContext.specs || [])}\nAudit Score: ${assetContext.auditScore || "N/A"}/100`;
    }

    const ai = getGenAI();

    // Clean model name (strip "models/" prefix if passed)
    const targetModel = model.replace(/^models\//, "");

    // Format messages for GoogleGenAI SDK contents
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: targetModel,
      contents,
      config: {
        systemInstruction: fullSystemInstruction,
      },
    });

    const reply = response.text || "I was unable to generate a response at this time.";

    return res.json({
      reply,
      model: targetModel,
      role,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to communicate with Gemini API.",
    });
  }
});

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MOTOVEX Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
