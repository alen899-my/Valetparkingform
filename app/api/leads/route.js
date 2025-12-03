import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { GridFSBucket } from "mongodb";

export async function POST(req) {
  try {
    const conn = await connectDB();
    const formData = await req.formData();

    const bucket = new GridFSBucket(conn.connection.db, {
      bucketName: "uploads",
    });

    const uploadedFiles = {};

    // upload file fields
    const fileFields = ["companyLogo", "clientLogo", "vatCertificate", "tradeLicense"];

    for (const field of fileFields) {
      const file = formData.get(field);

      if (file && typeof file !== "string") {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadStream = bucket.openUploadStream(file.name);
        uploadStream.end(buffer);

        uploadedFiles[field] = uploadStream.id.toString();
      }
    }

    // save text fields
    const leadData = {};
    formData.forEach((value, key) => {
      if (!fileFields.includes(key)) leadData[key] = value;
    });

    // attach file references
    Object.assign(leadData, uploadedFiles);

    const newLead = await Lead.create(leadData);

    return Response.json({ success: true, lead: newLead }, { status: 201 });

  } catch (error) {
    console.error("❌ API Error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
