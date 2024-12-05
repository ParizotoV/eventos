export default function PageInvite(props: any) {
  console.log("PaginaConvite", props)
  return (
    <div>
      <span>{props.params.alias}</span>
    </div>
  )
}