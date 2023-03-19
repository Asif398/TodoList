const express = require("express");
const router = express.Router();
const {verifiedToken,isAdmin} = require("../middleware/token")
const {createTodo,getAllTodo,getMyTodo,updateTodo} = require("../controllers/todo");

router.post("/createTodo",verifiedToken,createTodo);
router.get("/todo/all",verifiedToken,isAdmin,getAllTodo);
router.get("/todo/mytodo",verifiedToken,getMyTodo);
router.put("/todo/updatetodo/:id",verifiedToken,updateTodo);


// router.post("/signin",signin);


module.exports = router;