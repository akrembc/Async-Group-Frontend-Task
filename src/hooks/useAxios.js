import { useState, useEffect, useMemo } from "react";

const useAxios = (configObj) => {
  const {
    axiosInstance,
    method,
    url,
    requestConfig = {},
  } = useMemo(() => configObj, [configObj]); // useMemo ??

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(res);
        setResponse(res.data);
        setError("");
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [axiosInstance, method, requestConfig, url]);

  return [response, error, loading];
};

export default useAxios;
