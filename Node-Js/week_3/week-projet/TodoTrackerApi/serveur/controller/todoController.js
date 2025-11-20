import {
  getAllTodosService,
  getTodosByIdService,
  createTodosService,
  updateTodosService,
  deleteTodosService,
  toggleTodoService,
} from "../service/todoService.js";
import {
  PRIORITIES,
  DATE_REGEX,
  ALLOWED_UPDATE_FIELDS,
} from "../config/constants.js";

export async function getAllTodosController(req, res, next) {
  try {
    const result = await getAllTodosService(
      req.query,
      req.user.id,
      req.user.role
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getTodosByIdController(req, res, next) {
  try {
    const result = await getTodosByIdService(
      req.params.id,
      req.user.id,
      req.user.role
    );
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: "error",
        message: "Todo not found",
        code: 404,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function createTodosController(req, res, next) {
  try {
    const newTodo = await createTodosService(req.body, req.user.id);
    res.status(201).json({
      status: "success",
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "Chaque utilisateur doit avoir des titres de tâches uniques.",
        code: 400,
        timestamp: new Date().toISOString(),
      });
    }
    next(error);
  }
}

export async function updateTodosController(req, res, next) {
  try {
    // For updates, allow partial data (no title required)
    const updateData = {};

    for (const field of ALLOWED_UPDATE_FIELDS) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No valid fields to update",
        code: 400,
        timestamp: new Date().toISOString(),
      });
    }

    const updatedTodo = await updateTodosService(
      req.params.id,
      updateData,
      req.user.id,
      req.user.role
    );
    if (updatedTodo) {
      res.status(200).json({
        status: "success",
        message: "Todo updated successfully",
        data: updatedTodo,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Todo not found",
        code: 404,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "Chaque utilisateur doit avoir des titres de tâches uniques.",
        code: 400,
        timestamp: new Date().toISOString(),
      });
    }
    next(error);
  }
}

export async function deleteTodosController(req, res, next) {
  try {
    const deleted = await deleteTodosService(
      req.params.id,
      req.user.id,
      req.user.role
    );
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({
        status: "error",
        message: "Todo not found",
        code: 404,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function toggleTodoController(req, res, next) {
  try {
    const result = await toggleTodoService(
      req.params.id,
      req.user.id,
      req.user.role
    );
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Todo toggled successfully",
        data: result,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Todo not found",
        code: 404,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    next(error);
  }
}
