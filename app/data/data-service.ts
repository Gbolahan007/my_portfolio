"use server";

export async function handleSubmit(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // For now, just log the data
  console.log("Contact Form Data:", { name, email, message });
}
