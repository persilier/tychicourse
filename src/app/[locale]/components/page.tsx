import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { ComponentsNav } from "@/components/components-nav";
import { CodeBlock } from "@/components/code-block";
import { Icon } from "@iconify/react";
import { WizardForm } from "@/components/ui/wizard-form";

const buttonExampleCode = `import { Button } from "@/components/ui/button"

// Regular variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>

// Soft variants
<Button variant="softPrimary">Soft Primary</Button>
<Button variant="softSuccess">Soft Success</Button>
<Button variant="softWarning">Soft Warning</Button>
<Button variant="softInfo">Soft Info</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><PlusIcon /></Button>`;

const avatarExampleCode = `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`;

const inputExampleCode = `import { Input } from "@/components/ui/input"

<Input placeholder="Default input" />
<Input variant="success" placeholder="Success input" />
<Input variant="warning" placeholder="Warning input" />
<Input variant="destructive" placeholder="Destructive input" />
<Input variant="info" placeholder="Info input" />`;

const checkboxExampleCode = `import { Checkbox } from "@/components/ui/checkbox"

// Regular variants
<Checkbox variant="default" label="Default checkbox" />
<Checkbox variant="success" label="Success checkbox" />
<Checkbox variant="warning" label="Warning checkbox" />
<Checkbox variant="destructive" label="Destructive checkbox" />
<Checkbox variant="info" label="Info checkbox" />

// Sizes
<Checkbox size="sm" label="Small checkbox" />
<Checkbox size="default" label="Default checkbox" />
<Checkbox size="lg" label="Large checkbox" />

// With description
<Checkbox
  label="Terms and conditions"
  description="You agree to our terms of service and privacy policy."
/>`;

const wizardExampleCode = `import { WizardForm } from "@/components/ui/wizard-form"

const steps = [
  {
    title: "Personal Info",
    description: "Enter your personal information",
    content: <PersonalInfoForm />,
    isValid: true
  },
  {
    title: "Contact Details",
    description: "How can we reach you?",
    content: <ContactForm />,
    validationErrors: {
      email: "Please enter a valid email address",
      phone: "Phone number is required"
    }
  },
  {
    title: "Review",
    content: <ReviewStep />,
    isValid: true
  }
]

<WizardForm 
  steps={steps}
  variant="cards"
  onComplete={(data) => console.log(data)}
  onStepChange={(step) => console.log("Current step:", step)}
/>`;

export default function ComponentsPage() {
  const t = useTranslations();

  const exampleSteps = [
    {
      title: "Personal Info",
      description: "Enter your personal information",
      content: (
        <div className="space-y-4">
          <Input placeholder="Full Name" />
          <Input type="date" />
        </div>
      ),
      isValid: true,
    },
    {
      title: "Contact Details",
      description: "How can we reach you?",
      content: (
        <div className="space-y-4">
          <Input placeholder="Email" />
          <Input placeholder="Phone" />
        </div>
      ),
      validationErrors: {
        email: "Please enter a valid email address",
        phone: "Phone number is required",
      },
    },
    {
      title: "Review",
      description: "Review your information",
      content: (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <p>Please review your information before submitting.</p>
          </div>
        </div>
      ),
      isValid: true,
    },
  ];

  return (
    <div className="container py-10">
      <div className="grid grid-cols-[220px_1fr] gap-6">
        <ComponentsNav className="sticky top-14 z-30" />
        <main className="space-y-12">
          <h1 className="text-3xl font-bold">Components Showcase</h1>

          {/* Buttons Section */}
          <section id="button" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
              <div className="border rounded-lg space-y-6">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Regular Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="info">Info</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Soft Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="softPrimary">Soft Primary</Button>
                    <Button variant="softDestructive">Soft Destructive</Button>
                    <Button variant="softSuccess">Soft Success</Button>
                    <Button variant="softWarning">Soft Warning</Button>
                    <Button variant="softInfo">Soft Info</Button>
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">With Icons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      <Icon icon="heroicons:plus" className="mr-2 h-4 w-4" />
                      Add New
                    </Button>
                    <Button variant="success">
                      <Icon icon="heroicons:check" className="mr-2 h-4 w-4" />
                      Confirm
                    </Button>
                    <Button variant="destructive">
                      <Icon icon="heroicons:trash" className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <CodeBlock code={buttonExampleCode} title="Button Examples" />
                </div>
              </div>
            </div>
          </section>

          {/* Avatar Section */}
          <section id="avatar" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Avatars</h2>
              <div className="border rounded-lg space-y-6">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Sizes</h3>
                  <div className="flex items-center gap-4">
                    <Avatar size="sm">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="xl">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <div className="p-6">
                  <CodeBlock code={avatarExampleCode} title="Avatar Examples" />
                </div>
              </div>
            </div>
          </section>

          {/* Input Section */}
          <section id="input" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
              <div className="border rounded-lg space-y-6">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Variants</h3>
                  <div className="flex flex-col gap-4 max-w-sm">
                    <Input placeholder="Default input" />
                    <Input variant="success" placeholder="Success input" />
                    <Input variant="warning" placeholder="Warning input" />
                    <Input
                      variant="destructive"
                      placeholder="Destructive input"
                    />
                    <Input variant="info" placeholder="Info input" />
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Sizes</h3>
                  <div className="flex flex-col gap-4 max-w-sm">
                    <Input size="sm" placeholder="Small input" />
                    <Input size="default" placeholder="Default input" />
                    <Input size="lg" placeholder="Large input" />
                  </div>
                </div>

                <div className="p-6">
                  <CodeBlock code={inputExampleCode} title="Input Examples" />
                </div>
              </div>
            </div>
          </section>

          {/* Badge Section */}
          <section id="badge" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Badges</h2>
              <div className="border rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Regular Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Alert Section */}
          <section id="alert" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
              <div className="border rounded-lg p-6 space-y-6">
                <div className="space-y-4">
                  <Alert>
                    <Icon
                      icon="heroicons:information-circle"
                      className="h-4 w-4"
                    />
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>
                      This is a default alert message.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <Icon
                      icon="heroicons:exclamation-triangle"
                      className="h-4 w-4"
                    />
                    <AlertTitle>Error Alert</AlertTitle>
                    <AlertDescription>
                      This is an error alert message.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </section>

          {/* Card Section */}
          <section id="card" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Cards</h2>
              <div className="border rounded-lg p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Card content goes here.</p>
                    </CardContent>
                    <CardFooter>
                      <Button>Action</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Checkbox Section */}
          <section id="checkbox" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Checkboxes</h2>
              <div className="border rounded-lg space-y-6">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Regular Variants</h3>
                  <div className="flex flex-col gap-4">
                    <Checkbox variant="default" label="Default checkbox" />
                    <Checkbox variant="success" label="Success checkbox" />
                    <Checkbox variant="warning" label="Warning checkbox" />
                    <Checkbox
                      variant="destructive"
                      label="Destructive checkbox"
                    />
                    <Checkbox variant="info" label="Info checkbox" />
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Sizes</h3>
                  <div className="flex flex-col gap-4">
                    <Checkbox size="sm" label="Small checkbox" />
                    <Checkbox size="default" label="Default checkbox" />
                    <Checkbox size="lg" label="Large checkbox" />
                  </div>
                </div>

                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">With Description</h3>
                  <div className="flex flex-col gap-4">
                    <Checkbox
                      label="Terms and conditions"
                      description="You agree to our terms of service and privacy policy."
                    />
                    <Checkbox
                      variant="success"
                      label="Newsletter subscription"
                      description="Receive updates about our latest products and offers."
                    />
                  </div>
                </div>

                <div className="p-6">
                  <CodeBlock
                    code={checkboxExampleCode}
                    title="Checkbox Examples"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Wizard Form Section */}
          <section id="wizard-form" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Wizard Form</h2>
              <div className="border rounded-lg space-y-6">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Default Style</h3>
                  <WizardForm
                    steps={exampleSteps}
                    onComplete={(data) => console.log(data)}
                  />
                </div>

                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Cards Style</h3>
                  <WizardForm
                    steps={exampleSteps}
                    variant="cards"
                    onComplete={(data) => console.log(data)}
                  />
                </div>

                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium mb-4">Numbered Style</h3>
                  <WizardForm
                    steps={exampleSteps}
                    variant="numbered"
                    onComplete={(data) => console.log(data)}
                  />
                </div>

                <div className="p-6">
                  <CodeBlock
                    code={wizardExampleCode}
                    title="Wizard Form Examples"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
