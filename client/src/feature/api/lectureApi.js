import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/v1/lecture";

export const lectureApi = createApi({
  reducerPath: "lectureApi",
  tagTypes: ["Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateLectureMutation, useGetCourseLectureQuery } = lectureApi;
