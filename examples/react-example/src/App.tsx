import React from 'react';
import { 
  DelvForgeProvider, 
  Container, 
  Grid, 
  Flex, 
  Card, 
  Button, 
  Text, 
  FormGroup, 
  Input,
  useClassName 
} from '@delvforge/react';
import '@delvforge/core/css';
import './App.css';

function App() {
  return (
    <DelvForgeProvider>
      <div className="df-min-h-screen df-bg-gray-50">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <ComponentsSection />
          <FormSection />
        </main>
        <Footer />
      </div>
    </DelvForgeProvider>
  );
}

function Header() {
  const { cn, df } = useClassName();
  
  return (
    <header className={cn(df('bg-white'), df('shadow-sm'), df('border-b'))}>
      <Container>
        <Flex justify="between" align="center" df="py-4">
          <Text as="h1" size="2xl" weight="bold" color="primary-500">
            DelvForge React
          </Text>
          <Flex gap="4">
            <Button variant="outline" size="sm">Documentation</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="df-py-20 df-bg-gradient-to-br df-from-blue-50 df-to-indigo-100">
      <Container center>
        <div className="df-text-center df-max-w-4xl df-mx-auto">
          <Text as="h1" size="5xl" weight="bold" df="mb-6">
            React + DelvForge
          </Text>
          <Text size="xl" color="gray-600" df="mb-8">
            Build beautiful React applications with DelvForge's powerful utility framework.
            Enjoy type-safe components and seamless integration.
          </Text>
          <Flex justify="center" gap="4">
            <Button variant="primary" size="lg">Explore Components</Button>
            <Button variant="outline" size="lg">View Examples</Button>
          </Flex>
        </div>
      </Container>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Type-Safe Components",
      description: "Full TypeScript support with intelligent autocomplete and type checking.",
      icon: "⚡"
    },
    {
      title: "React Hooks",
      description: "Powerful hooks for responsive design and dynamic class generation.",
      icon: "🎣"
    },
    {
      title: "JSX Components",
      description: "Pre-built React components that work seamlessly with DelvForge utilities.",
      icon: "⚛️"
    }
  ];

  return (
    <section className="df-py-16">
      <Container>
        <Text as="h2" size="3xl" weight="bold" align="center" df="mb-12">
          React Features
        </Text>
        <Grid cols={1} gap={8} responsive={{ md: 3 }}>
          {features.map((feature, index) => (
            <Card key={index} variant="elevated" padding="6">
              <div className="df-text-center">
                <div className="df-text-4xl df-mb-4">{feature.icon}</div>
                <Text as="h3" size="xl" weight="semibold" df="mb-3">
                  {feature.title}
                </Text>
                <Text color="gray-600">
                  {feature.description}
                </Text>
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

function ComponentsSection() {
  return (
    <section className="df-py-16 df-bg-white">
      <Container>
        <Text as="h2" size="3xl" weight="bold" align="center" df="mb-12">
          React Components
        </Text>
        
        <div className="df-space-y-12">
          {/* Buttons */}
          <div>
            <Text as="h3" size="xl" weight="semibold" df="mb-6">Buttons</Text>
            <Flex gap="4" df="flex-wrap">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </Flex>
            <Flex gap="4" df="flex-wrap mt-4">
              <Button variant="primary" size="xs">Extra Small</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="xl">Extra Large</Button>
            </Flex>
          </div>

          {/* Cards */}
          <div>
            <Text as="h3" size="xl" weight="semibold" df="mb-6">Cards</Text>
            <Grid cols={1} gap={6} responsive={{ md: 3 }}>
              <Card variant="default" padding="6">
                <Text as="h4" weight="semibold" df="mb-2">Default Card</Text>
                <Text color="gray-600">Basic card with default styling and shadow.</Text>
              </Card>
              <Card variant="elevated" padding="6">
                <Text as="h4" weight="semibold" df="mb-2">Elevated Card</Text>
                <Text color="gray-600">Card with enhanced shadow for prominence.</Text>
              </Card>
              <Card variant="outlined" padding="6">
                <Text as="h4" weight="semibold" df="mb-2">Outlined Card</Text>
                <Text color="gray-600">Card with border instead of shadow.</Text>
              </Card>
            </Grid>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FormSection() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="df-py-16 df-bg-gray-50">
      <Container>
        <div className="df-max-w-md df-mx-auto">
          <Text as="h2" size="3xl" weight="bold" align="center" df="mb-8">
            Contact Form
          </Text>
          <Card variant="elevated" padding="8">
            <form onSubmit={handleSubmit} className="df-space-y-6">
              <FormGroup label="Full Name" required>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </FormGroup>
              
              <FormGroup label="Email Address" required>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </FormGroup>
              
              <FormGroup label="Message">
                <textarea
                  className="df-form-control df-h-24 df-resize-none"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </FormGroup>
              
              <Button variant="primary" fullWidth type="submit">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="df-bg-gray-800 df-text-white df-py-8">
      <Container>
        <Flex justify="between" align="center">
          <Text weight="semibold">DelvForge React Example</Text>
          <Text size="sm" color="gray-400">
            Built with React and DelvForge
          </Text>
        </Flex>
      </Container>
    </footer>
  );
}

export default App;