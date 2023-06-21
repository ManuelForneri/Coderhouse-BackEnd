import express from "express";
import { UserModel } from "../DAO/models/users.model.js";

export const usersHtmlRouter = express.Router();

usersHtmlRouter.get("/", async (req, res) => {
  try {
    const { pageQuery } = req.query;
    const queryResult = await UserModel.paginate(
      {},
      { limit: 20, page: pageQuery || 1 }
    );
    let users = queryResult.docs;

    const {
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    } = queryResult;
    users = users.map((user) => {
      return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    });
    return res.status(200).render("usersList", {
      users,
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    });
  } catch (error) {
    return res.render("error");
  }
});
