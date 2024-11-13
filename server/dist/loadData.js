"use strict";
// import fs from 'fs';
// import path from 'path';
// import mongoose from 'mongoose';
// import User from './models/User';
// // טעינת נתוני ארגונים מ-JSON
// const loadOrganizations = async () => {
//   const dataPath = path.join(__dirname, 'data', 'organization.json');
//   const organizations = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
//   for (const org of organizations) {
//     const newUser = new User({
//       username: org.username,
//       password: org.password,
//       organization: org.organization,
//       region: org.region,
//     });
//     try {
//       await newUser.save();
//       console.log(`User ${org.username} saved successfully.`);
//     } catch (error) {
//       console.error(`Error saving user ${org.username}:`, error);
//     }
//   }
// };
// // חיבור למסד נתונים והטענת הנתונים
// const connectAndLoadData = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI || '', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');
//     await loadOrganizations();
//     process.exit();
//   } catch (error) {
//     console.error('Error connecting to MongoDB or loading data', error);
//     process.exit(1);
//   }
// };
// // הרצת החיבור והטעינה
// connectAndLoadData();
//# sourceMappingURL=loadData.js.map