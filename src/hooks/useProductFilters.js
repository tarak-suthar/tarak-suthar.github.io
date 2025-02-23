import { useCallback } from "react";
import { useSearchParams } from "react-router";

export default function useProductFilters() {
    const [queryParams, setQueryParams] = useSearchParams()

    const query = queryParams.get("query");
    const size = parseInt(queryParams.get("size") ?? 10);
    const sortBy = queryParams.get("sortBy");
    const direction = queryParams.get("direction");
    const paramsPage = parseInt(queryParams.get("page"));
    const validPage = paramsPage >= 0 ? paramsPage : 1;
    const page = validPage;

    const setFilters = useCallback((filters) => {
        console.log("hello in my hook", filters);
        setQueryParams((params) => {
            if (filters.query != undefined) {
                params.set("query", filters.query);
            }
            if (filters.pageSize) {
                params.set("size", filters.pageSize);
            }
            if (filters.sortBy) {
                params.set("sortBy", filters.sortBy)
                if (filters.direction == "DESC") {
                    params.set("direction", filters.direction);
                } else params.set("direction", filters.direction);
            }
            if (filters.page) {
                params.set("page", filters.page)
            }
            return params;
        });
    }, [])

    const resetFilters = useCallback(() => {
        setQueryParams((params) => {
            params.delete("query");
            params.delete("size");
            params.delete("sortBy");
            params.delete("direction");
            params.delete("page");
            return params;
        })
    }, []);

    return {
        query,
        size,
        sortBy,
        direction,
        page,
        setFilters,
        resetFilters
    }

}