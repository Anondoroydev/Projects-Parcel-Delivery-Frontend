import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation({
      query: (data) => ({
        url: "/parcel/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    updateParcel: builder.mutation({
      query: ({ trkId, data }) => ({
        url: `/parcel/${trkId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    getAllParcels: builder.query({
      query: (params) => ({
        url: "/parcel",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
      transformResponse: (res) => {
        const data = res.data;
        const meta = res.meta;
        return { data, meta };
      },
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useGetAllParcelsQuery,
  useUpdateParcelMutation,
  useLazyGetAllParcelsQuery,
} = authApi;
