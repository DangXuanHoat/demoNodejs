
import * as tools from "../../utils/tools.js";
import { isEmpty, isSpecialCharacter } from "../../utils/validInput.js";
import bcrypt from "bcrypt";
import DB from "../../database/index.js";
import User from "../../database/model/User.js";

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const index = async (req, res) => {
  const dbConnect = new DB().getConnectionManager().get();
  let responsitory = dbConnect.get().getRepository("User");
  let salt = bcrypt.genSaltSync(10);
  let response = {
    error: "00",
    message: "",
    data: null,
  };
  let user = new User();
  user = {
    email,
    username,
    password,
    re_password,
    permissions,
    gender,
    birthday,
    first_name,
    last_name,
    is_active = false,
    is_reported = false,
    is_blocked = false,
    preferences,
    question,
    answer,
  } = req.body;

  if (re_password !== password) {
    response.error = "01";
    response.message = "Password nhập lại không trùng!";
  }
  if (!isSpecialCharacter(password)) {
    response.error = "02";
    response.message = "Password nhập không có kí tự đặc biệt!";
  }
  user.password = bcrypt.hashSync(user.password, salt);
  if (!isEmpty(email) && !tools.checkEmail(email)) {
    response.error = "03";
    response.message = "Email sai định dạng!";
  }
  if (
    await responsitory.find({
      where: [{ username: username }, { email: email }],
    })
  ) {
    response.error = "04";
    response.message = "Tài Khoản đã tồn tại";
  }
  responsitory.save();
};
/**
 * Login vao page
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const login = async (req, res, next) => {
  const dbConnect = new DB().getConnectionManager().get();
  let responsitory = dbConnect.get().getRepository("User");
  let { username, password } = req.body;
  let user = await responsitory.find({
    where: [{ username: username }, { email: username }],
  });
  if (user) {
  }
};
export const find = async (req, res) => {};
export const create = async (req, res) => {};
export const update = async (req, res) => {};
export const detroy = async (req, res) => {};
