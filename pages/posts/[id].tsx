import _ from "lodash";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Post({
  res,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>ID: {id}</h1>
      <h2>Name: {res.name}</h2>
      <p>Height: {res.height}</p>
      <p>Weight: {res.weight}</p>
      <p>
        <Image
          src={res.sprites.other["official-artwork"].front_default}
          alt="pokemon pic"
          width={400}
          height={400}
        />
      </p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (res) => res.json()
  );
  return {
    props: {
      res,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: _.range(1, 21).map((id: number) => ({ params: { id: id + "" } })),
    // `true` or `false` or `blocking`
    fallback: true,
  };
};
