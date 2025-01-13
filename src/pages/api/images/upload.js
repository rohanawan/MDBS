export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { size } = req.body;
    if (size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: "File is too large" });
    }
    res.status(200).json({ message: "File handled successfully!" });
  } catch (error) {
    console.error("Error handling file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
