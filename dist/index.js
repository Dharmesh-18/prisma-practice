"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield client.user.findMany({
        include: {
            todos: true
        }
    });
    res.json({
        users
    });
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield client.user.findFirst({
        where: {
            id: Number(id)
        },
        select: {
            username: true,
            firstName: true,
            todos: true
        }
    });
    res.json({
        user
    });
}));
app.listen("3000");
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.create({
            data: {
                username: "dharmesh18",
                password: "12234",
                firstName: "dharmesh",
                lastname: "tiwari"
            }
        });
    });
}
function findUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.findFirst({
            where: {
                id: 1
            },
            include: {
                todos: true
            }
        });
        console.log(user);
    });
}
function createUserWithTodo() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.create({
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
        });
    });
}
// findUser();
createUserWithTodo();
