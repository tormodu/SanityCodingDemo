import Head from "next/head";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Avatar from "../../components/avatar";
import PostTitle from "../../components/post-title";
import { demoPageQuery, demoPageSlugsQuery } from "../../lib/queries";
import { urlForImage, usePreviewSubscription } from "../../lib/sanity";
import { sanityClient, getClient } from "../../lib/sanity.server";
import Image from "next/image";
import Date from "../../components/date";
export default function DemoPage({ data = {}, preview }) {
  const router = useRouter();
  const slug = data?.demoPage?.slug;
  const {
    data: { demoPage },
  } = usePreviewSubscription(demoPageQuery, {
    params: { slug },
    initialData: data,
    enabled: preview && slug,
  });

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{demoPage.title}</title>
              </Head>
              <PostTitle>{demoPage.title}</PostTitle>
              <Avatar
                name={demoPage.author.name}
                picture={demoPage.author.picture}
              />
              <b>
                Published date: <Date dateString={demoPage.date} />
              </b>
              <Image
                width={2000}
                height={1000}
                src={urlForImage(demoPage.poster)
                  .height(1000)
                  .width(2000)
                  .url()}
              />
              <PostBody content={demoPage.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const { demoPage } = await getClient(preview).fetch(demoPageQuery, {
    slug: params.slug,
  });
  return {
    props: {
      preview,
      data: {
        demoPage,
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(demoPageSlugsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
