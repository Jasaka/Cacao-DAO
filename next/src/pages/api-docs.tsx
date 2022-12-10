import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next API for CacaoDAO',
        version: '1.0',
        description: 'This is the Next.js based API for CacaoDAO, it works as a proxy to the hybrid architecture of the app, allowing classic database designs to work in tandem with arweave for data storage and ethereum for smart contract interaction.',
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;