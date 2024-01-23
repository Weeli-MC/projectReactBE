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
    getEmployees: builder.query<Employee[], void>({
      query: (page: any = 1) => `/employees?_page=${page}&_limit=10`,
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

    deleteEmployees: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),

    updateEmployees: builder.mutation({
      query: ({ id, body }) => ({
        url: `/employees/${id}`,
        method: "PUT",
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

export const {
  useGetEmployeesQuery,
  useCreateEmployeesMutation,
  useDeleteEmployeesMutation,
} = jsonServerApi;
