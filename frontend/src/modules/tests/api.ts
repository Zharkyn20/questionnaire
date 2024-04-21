import { ApiClient } from "@/utils/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Course {
  id: number;
  title: string;
  mode: "static" | "dynamic";
}

export function useTestsQuery() {
  const api = ApiClient();
  const data = useQuery<Course[]>({
    queryKey: ["tests"],
    queryFn: () => api.get("/course/"),
  });

  return data;
}

export function useCreateTestsMutation() {
  const api = ApiClient();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: FormData) =>
      api.post(
        "/course",
        { title: data.get("title"), mode: data.get("mode") },
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tests"] });
    },
  });

  return { mutation };
}
