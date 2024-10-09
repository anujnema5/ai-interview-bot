import { RouterProvider } from 'react-router-dom';
import router from './routes/route';
import { Toaster } from "@/components/ui/sonner"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='bottom-left' richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App