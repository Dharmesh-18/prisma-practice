import express from 'express';
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

app.get("/users", async (req, res) => {
    const users = await client.user.findMany({
        include: {
            todos: true
        }
    });
    res.json({
        users
    })
});

app.get("/todos/:id", async (req, res) => {
    const id = req.params.id;

    const user = await client.user.findFirst({
        where :{
            id: Number(id)
        },
        select: {
            username: true,
            firstName: true,
            todos: true
        }
    })
    res.json({
        user
    })
})

app.listen("3000");

async function createUser() {
    const user = await client.user.create({
        data: {
            username: "dharmesh18",
            password: "12234",
            firstName: "dharmesh",
            lastname: "tiwari"
        }
    })
}

async function findUser() {
    const user = await client.user.findFirst({
        where: {
            id: 1
        }, 
        include: {
            todos: true
        }
    })

    console.log(user);
}

async function createUserWithTodo() {
    const user = await client.user.create({
        data: {
            username: "dharmesh19",
            password: "12345",
            firstName: "dharmesh",
            lastname: "tiwari",
            todos: {
                create: {
                    title: "eat paneer",
                    description: "bhurji bna k khana",
                    done: false
                }
            }
        }
    })
}

// findUser();
createUserWithTodo();