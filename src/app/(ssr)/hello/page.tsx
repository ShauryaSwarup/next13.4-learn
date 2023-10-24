// By default the component is a server side rendered component.
export default async function Page() {
  await new Promise(resolve => setTimeout(resolve, 5000));
  return (
    <div>
      <h1 style={{color:'red'}}>Server Rendered - Hello, World!</h1>
    </div>
  );
}