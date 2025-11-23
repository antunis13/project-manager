import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from '@clerk/clerk-react'

export default function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonPopoverFooter: 'hidden',
            },
          }}
        />
        {children}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
