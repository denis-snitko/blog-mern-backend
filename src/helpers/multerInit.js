import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_, __, cd) => {
    const dirName = 'uploads';
    
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
    
    cd(null, 'uploads');
  },
  filename: (_, file, cd) => {
    cd(null, file.originalname);
  },
});

export const upload = multer({ storage });