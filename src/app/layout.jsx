import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })
export const metadata = {

}

export default function RootLayout({ children }) {
  return (
    <>

      <html lang="en">
        <body className={inter.className}>
          <div>
            {children}
          </div>
          <ToastContainer
            pauseOnHover={false}
            autoClose={150000}
            pauseOnFocusLoss={false}
          />
        </body>

      </html>

    </>
  )
}
