# Honey Chain – Smart Honey Traceability & Beekeeping Management Platform
**Smart India Hackathon 2026 (SIH 2026)**  
**Problem Statement ID:** SIH26021  
**Category:** Cyber Security and Blockchain  
**Team ID:** 168252  
**Team Name:** HiveNova  

---

## 🍯 Project Overview

**Honey Chain** is a connected IoT, AI, and distributed blockchain platform that turns real-time beehive sensor telemetry and supply-chain milestones into an immutable, verifiable digital history. 

From wooden hive boxes in rural Himalayan apiaries to the consumer's breakfast table, Honey Chain eliminates inverted sugar syrup adulteration, alerts beekeepers of colony diseases early, and provides consumers with an authentic **Hive-to-Bottle Digital Passport** accessible in under 5 seconds via QR scan.

---

## 🚀 Key Features

1. **Light & Dark Theme Modes:**
   - **Light Mode:** Warm ivory/off-white background, deep chocolate brown typography, muted amber highlights, soft card borders.
   - **Dark Mode:** Deep charcoal/earth-brown background, golden accents, comfortable contrast for night monitoring.
   - Global toggle with micro-transition in navigation bar.

2. **Bilingual Support (English & Rural-Friendly Hindi):**
   - Seamless one-click language switcher (`EN` / `हिंदी`) in the navigation bar.
   - Natural Hindi translations tailored for rural beekeepers (*मधुमक्खी पालक, छत्ता तापमान, आर्द्रता, वजन, रोग जांच, बैच सत्यापन*).
   - Instant language switching without full page refresh.

3. **Beekeeper Farm Dashboard:**
   - Real-time telemetry monitoring: Temperature (DHT22), Relative Humidity, Colony Gross Weight (HX711 Load Cell).
   - Automated disease alerts (sudden weight drop warning for swarming/theft, high temperature ventilation alerts).
   - Interactive 24-hour sensor sparkline trends.
   - Multi-apiary management and digital twin hive records.

4. **Smart Hive IoT Monitoring:**
   - Live telemetry feed from ESP32 Microcontroller, DHT22/DHT11 sensors, and HX711 Load Cell.
   - ESP32-CAM simulated frame capture with night-vision infrared illumination status.
   - Interactive **Live Telemetry Simulator Toggle** to observe real-time sensor updates every 2.5s.
   - Clear distinction between simulated presentation feed and hardware inputs.

5. **AI Hive Health & Disease Classification:**
   - Powered by an **EfficientNet-B0 CNN** computer vision model (trained on open Honeybee Hive Health & NBHM datasets).
   - Detects brood diseases: **Varroa Destructor Mites**, **American Foulbrood (AFB)**, **Chalkbrood Fungus**, or confirms **Healthy Active Queen**.
   - Output confidence score (e.g. 97.4%) and multi-sensor correlation.
   - Automated **Honey Yield Forecasting** (e.g. ~18.5 kg harvest window).
   - Actionable beekeeper remedial advisory in English and Hindi.
   - Custom hive image upload with client-side inference simulation.

6. **Honey Harvest & Batch Management:**
   - Form to register new honey batches with auto-generated unique Batch IDs (`HC-2026-BXXXX`).
   - Records beekeeper details, source hives, floral source, quantity, and FSSAI lab parameters (Moisture, HMF, C4 Sugar test, Pollen count).
   - Generates and prints cryptographic QR code badges.
   - Commits provenance records to the distributed blockchain ledger.

7. **Distributed Blockchain Traceability Ledger:**
   - Hybrid On-Chain / Off-Chain Architecture: MongoDB off-chain for high-frequency IoT time-series; **Cosmos SDK / CometBFT / Hyperledger** on-chain for immutable batch milestones.
   - 6-Stage Supply Chain Trajectory: `Apiary Harvest` → `Quality Lab` → `Cold Filtration` → `Bottling & QR` → `Retailer Shelf` → `Consumer Scan`.
   - Real-time block transaction explorer with SHA-256 hashes, gas metrics, and signing entities.
   - Interactive **Cryptographic Hash & Merkle Root Verifier**.

8. **Consumer QR Verification Portal:**
   - Live device camera scanner with permission handling and guidance.
   - Manual batch code entry with 1-click test sample badges.
   - **Signature Liquid Honey-Pouring Transition:** Realistic golden-amber honey flows smoothly downwards from top of screen before revealing the passport!
   - Full **Verified Digital Passport**: Beekeeper profile with GPS location, FSSAI accredited chemical assay, complete supply chain timeline, and downloadable certificate of authenticity.
   - Demonstrates **Adulteration / Fraud Detection Alert** when suspect batch (`HC-2026-WARN-999`) is scanned.

9. **National Initiatives & Policy Alignment:**
   - Aligned with National Beekeeping & Honey Mission (**NBHM**).
   - Interfacing with **Madhukranti Portal** for beekeeper onboarding.
   - Compliance with **FSSAI** Manual of Analysis for Honey and Beehive Products.
   - Conforms to Beekeeping Development Committee (**EAC-PM**) recommendations.

---

## 🧪 Quick Test Batch Presets (For Judges & Evaluators)

In the **Verify Honey QR** page (`/verify`), you can click any of the one-click presets:
- `HC-2026-HIMA-081`: Raw Himalayan Multifloral Forest Honey (100% Certified Organic, Parvati Valley).
- `HC-2026-KASH-114`: Pure White Kashmir Acacia Honey (Trall, Pulwama, J&K).
- `HC-2026-SUND-042`: Sundarbans Wild Mangrove Forest Honey (Mouli Collectors, West Bengal).
- `HC-2026-WARN-999`: Counterfeit Sample (Fails C4 sugar syrup test, demonstrates fraud alert).

---

## 🛠️ Technology Stack

- **Frontend:** React.js 18, Vite 5, React Router v6, Tailwind CSS 3
- **Icons:** Lucide React
- **QR Generator:** QRCode.js
- **Animations:** CSS3 Keyframe Viscous Honey Pour, Canvas Confetti
- **IoT Protocols:** ESP32, MQTT / REST APIs, JSON Telemetry Schema
- **AI/ML:** EfficientNet-B0 CNN, OpenCV pre-processing
- **Blockchain:** Cosmos SDK, CometBFT consensus, Go custom modules

---

## 💻 Running the Application Locally

```bash
# Install dependencies
pnpm install
# or
npm install

# Start Vite Development Server
pnpm dev
# or
npm run dev

# Build for Production
pnpm build
# or
npm run build
```

Open `http://localhost:5173` in your browser.
