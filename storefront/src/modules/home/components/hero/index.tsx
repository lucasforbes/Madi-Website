import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link" // Import the Link component

const Hero = () => {
  return (
    <div className="h-[100vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <Image
        src="/hero-background.png"
        alt="Hero Image showcasing Madi's creations"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority={true}
        draggable="false"
        className="absolute inset-0 z-0"
      />

      {/* This section is updated */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center small:p-32 gap-6">
        <Heading
          level="h1"
          className="text-4xl leading-10 text-white font-bold"
          // className="text-4xl leading-10 text-ui-fg-base font-bold"
        >
          Look clothes and shit
        </Heading>

        <LocalizedClientLink href="/store">
          <Button variant="secondary">
            Shop Now
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero