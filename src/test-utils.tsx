import {RenderOptions, render} from '@testing-library/react'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { BrowserRouter } from 'react-router-dom'


const customRender = (
    ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  render(ui, {wrapper: BrowserRouter, ...options})

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// override render method
export {customRender as render}