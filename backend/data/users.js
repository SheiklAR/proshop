import bcrypt from "bcryptjs";


const users = [
    {
        name: 'John',
        email: 'john@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true,
    },
    {
        name: 'Jane Doe',
        email: 'janedoe@email.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true,
    },

]

export default users;