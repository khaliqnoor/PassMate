import Password from "../models/passwordModel.js";


export const savePassword = async (req, res)=>{
    try {
    const userId = req.headers.userid

     if(!userId){
       return res.status(400).json({ message: "No user found" });
     }
    const { password, username, url } = req.body;

    if (!password || !username || !url) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newPassword = Password.create({
      userId,
      password,
      username,
      url
    });

    await newPassword.save();

    return res.status(201).json(newPassword);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

export const updatePassword = async (req, res)=>{

    const { id } = req.params;
    const { password, username, url } = req.body;

    if(!req.headers.userid) return res.status(400).json({ message: "User ID missing" });

try {
    const updated = await Password.findOneAndUpdate(
      { _id: id, userId:req.headers.userid  },
      { password, username, url },
      { new: true } 
    );

    return res.json(updated);


  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

export const deletedPassword = async  (req, res) => {
  try {
    const userId = req.headers.userid;
    const { id } = req.params;

    await Password.findOneAndDelete({ _id: id, userId });

    return res.json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}



export const getAllPass = async (req, res) => {
  try {
    const userId = req.headers.userid;

    if (!userId) {
      return res.status(400).json({ message: "User IS    missing" });
    }

    // Only fetch passwords of THIS user
    const passwords = await Password.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}