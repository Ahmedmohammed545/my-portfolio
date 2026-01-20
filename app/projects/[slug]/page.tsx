export default function Page({ params }: { params: { slug: string } }) {
  return <div style={{ padding: 40 }}>SLUG = {params.slug}</div>
}


