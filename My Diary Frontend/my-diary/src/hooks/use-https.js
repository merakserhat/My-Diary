import { useRef, useState } from "react";
import { useCallback } from "react";

const useHttps = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const subscribed = useRef(true);

  const unsubscribe = useCallback(() => {
    subscribed.current = false;
  }, []);

  const subscribe = useCallback(() => {
    subscribed.current = true;
  }, []);

  const sendRequest = useCallback(
    async (config, dontListen) => {
      subscribe();

      subscribed.current && !dontListen && setIsLoading(true);
      subscribed.current && !dontListen && setError(false);

      try {
        const request = await fetch(config.url, {
          method: config.method ? config.method : "GET",
          headers: config.headers ? config.headers : {},
          body: config.body ? JSON.stringify(config.body) : null,
        });

        const data = await request.json();

        if (!request.ok) {
          if (data.error) {
            subscribed.current && !dontListen && setError(data.error);
          } else {
            subscribed.current && !dontListen && setError(data);
          }
        }

        subscribed.current && !dontListen && setIsLoading(false);

        if (!data.error) {
          subscribed.current && !dontListen && setError(undefined);
        }

        return data;
      } catch (e) {
        subscribed.current && !dontListen && setError(e);
      }
    },
    [subscribe]
  );

  return { sendRequest, unsubscribe, isLoading, error };
};

export default useHttps;
