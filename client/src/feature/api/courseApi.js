import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/v1/course/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refech_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refech_Course"],
    }),
    getCreateCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refech_Course"],
    }),
  }),
});

export const { useCreateCourseMutation, useGetCreateCourseQuery } = courseApi;
