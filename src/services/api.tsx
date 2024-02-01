//IGNORE THIS PAGE FOR NOW. RTK QUERY IMPLEMENTATION

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Employee {
  id?: number;
  name?: string;
}

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  tagTypes: ["Employees"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
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

    deleteEmployees: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),

    updateEmployees: builder.mutation({
      query: ({ id, username, salary, department }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: {
          name: username,
          salary: parseInt(salary),
          department: department,
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
  useUpdateEmployeesMutation,
} = jsonServerApi;
