import express from 'express';
import {deleteUserById, getUserById, getUsers,} from '../db/users'


export const getAllUsers = async (req: express.Request, res: express.Response)=>{
    try {
        const users = await getUsers();
        return res.status(200).json(users).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)  
    }
}

export const deleteUser = async (req: express.Request, res: express.Response)=>{
    try {
        const {id}= req.params;
        const deletedUser = await deleteUserById(id);
        if (!deletedUser) {
            return res.sendStatus(403)    
        }

        return res.status(200).json(deletedUser);

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)  
    }
}

export const updateUser = async (req:express.Request,res:express.Response)=>{
    try {
        const {id}= req.params
        const {username} = req.body;
        if (!username) {
           return  res.sendStatus(403)   
        }
        const user = await getUserById(id);
        if (!user) {
         return  res.sendStatus(403)  
        }
        
        user.username = username;
        await user?.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.sendStatus(400) 
    }
}



// const getAllUsers = async (req, res) => {
//     try {
//       const users = await User.find();
//       res.status(200).json({ message: 'Users retrieved successfully', users });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to retrieve users', error });
//     }
//   };
  
//   // Function to get a user by id
//   const getUserById = async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json({ message: 'User retrieved successfully', user });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to retrieve user', error });
//     }
//   };

// const deleteUserById = async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const user = await User.findByIdAndDelete(userId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json({ message: 'User deleted successfully', user });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to delete user', error });
//     }
//   };