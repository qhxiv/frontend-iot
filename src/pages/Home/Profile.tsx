import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div className="flex flex-col space-y-4">
      <h2>Username: qhxiv</h2>
      <Button variant="outline">Change password</Button>
      <Button variant="outline">Change username</Button>
    </div>
  );
}
