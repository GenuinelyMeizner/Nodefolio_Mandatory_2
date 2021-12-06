import bcrypt from "bcrypt";

const hashedpassword = await bcrypt.hash("admin", 12);

export {hashedpassword}

