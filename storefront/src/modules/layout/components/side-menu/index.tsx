"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              {/* Trigger */}
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all outline-none
                             bg-transparent text-brand-dark hover:text-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent"
                  aria-label="Open menu"
                >
                  Menu
                </Popover.Button>
              </div>

              {/* Panel */}
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel
                  className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min
                             h-[calc(100vh-1rem)] z-30 inset-x-0 m-2 text-sm"
                >
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full rounded-xl justify-between p-6 shadow-2xl
                               bg-[rgba(17,17,17,0.85)] text-white ring-1 ring-white/10"
                  >
                    {/* Close */}
                    <div className="flex justify-end" id="xmark">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        aria-label="Close menu"
                        className="p-2 rounded-md hover:bg-white/10 transition"
                      >
                        <XMark />
                      </button>
                    </div>

                    {/* Links */}
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => (
                        <li key={name}>
                          <LocalizedClientLink
                            href={href}
                            className="text-2xl leading-9 hover:text-brand-accent transition"
                            onClick={close}
                            data-testid={`${name.toLowerCase()}-link`}
                          >
                            {name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>

                    {/* Region + Footer */}
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between items-center"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>

                      <Text className="flex justify-between txt-compact-small text-white/70">
                        © {new Date().getFullYear()} Madi. All rights reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu