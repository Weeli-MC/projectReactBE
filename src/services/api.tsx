import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Employee {
  id?: number;
  name?: string;
}

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  tagTypes: ["Employees"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<any, void>({
      query: () => `/employees`,
      providesTags: ["Employees"],
    }),

    createEmployees: builder.mutation({
      query: (body) => ({
        url: `/employees`,
        method: "POST",
        body: {
          name: body.username,
          salary: body.salary,
          department: body.department,
          id: body.length,
        },
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const { useGetEmployeesQuery, useCreateEmployeesMutation } =
  jsonServerApi;
