import { useQuery, useQueryClient } from '@tanstack/react-query';

import { CloudinaryResource } from '@/types/cloudinary';

interface UseResources {
  initialResources?: Array<CloudinaryResource>;
  disableFetch?: boolean;
  tag?: string;
}

export function useResources(options?: UseResources) {
  const queryClient = useQueryClient()
  const { disableFetch = false } = options || {}

  const { data: resources } = useQuery({
    queryKey: ['resources', options?.tag],
    queryFn: async () => {
      const {data} = await fetch('/api/resources').then(res => res.json());
      return data
    },
    initialData: options?.initialResources,
    enabled: !disableFetch
  })

  function addResources(results: Array<CloudinaryResource>) {
    queryClient.setQueryData(['resources', process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG as string], (old: Array<CloudinaryResource>) => {
      return [...results, ...old]
    })

    queryClient.invalidateQueries({
      queryKey: ['resources', process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG as string],
    })
  }

  return { resources, addResources }
}