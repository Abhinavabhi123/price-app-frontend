import PageHeader from "../../components/admin/PageHeader";
import CreateCardForm from "../../container/admin/CreateCardForm";

export default function CreateCard() {
  return (
    <div className="w-full h-full mb-20">
      <div className="w-full h-[10%]">
        <PageHeader title="Create Card" btnActive={false} />
      </div>
      <p className="text-xs px-10 text-yellow-500">
        *When you create a card, The start date of the creating card must be
        greater than of the endDate of the last added card!Other wise it will
        leads to technical issue*
      </p>
      <div className="w-full h-[90%] overflow-y-scroll p-5">
        <CreateCardForm />
      </div>
    </div>
  );
}
