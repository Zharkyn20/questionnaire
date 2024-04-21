import axios from "axios";

export const BASE_URL = "http://4.227.168.199:8000/";

export const createLink = async (subtopic_id: number) => {
  return await axios<{url: string}>({
    method: "post",
    url: "link/",
    baseURL: BASE_URL,
    params: { subtopic_id, course_id: 1, user_id: 1, question_amount: 5 },
  });
};
