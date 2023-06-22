import { ReactNode } from "react"

interface SpacesLayoutProps{
  children: ReactNode,
  createSpaceModal: ReactNode,
}

export default function Layout({children, createSpaceModal}:SpacesLayoutProps){
  return <>
    {createSpaceModal}
    {children}
  </>
}