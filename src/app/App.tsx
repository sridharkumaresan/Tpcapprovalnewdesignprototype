import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </FluentProvider>
  );
}
