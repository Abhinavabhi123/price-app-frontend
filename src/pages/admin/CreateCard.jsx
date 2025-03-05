import PageHeader from "../../components/admin/PageHeader";
import CreateCardForm from "../../container/admin/CreateCardForm";

export default function CreateCard() {
  return (
    <div className="w-full h-full mb-20">
      <div className="w-full h-[10%]">
        <PageHeader title="Create Card" btnActive={false} />
      </div>
      <div className="w-full h-[90%] overflow-y-scroll p-5">
        <CreateCardForm />
      </div>
    </div>
  );
}
