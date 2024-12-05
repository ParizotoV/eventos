export default function PageAdminEvent(props: any) {
  const id = props.params.todos[0];
  const password = props.params.todos[1];
  return (
    <div className="flex flex-col">
      <span>id: {id}</span>
      <span>Senha: {password}</span>
    </div>
  )
}