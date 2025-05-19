import { Title } from './../Title';
import { customerServiceItems } from './data';

export const CustomerService = () => {
  return (
    <section className="my-6 lg:my-8 p-6 lg:p-16 grid gap-14 rounded-xl bg-[#f6f6f6]">
      <Title className="text-center">
        We built our business on customer service
      </Title>
      <ul className="grid lg:grid-cols-3 gap-6">
        {customerServiceItems.map(({ title, desc, Icon }) => (
          <li
            key={title}
            className="inline-flex items-center gap-4 lg:flex-col lg:text-center"
          >
            <Icon width={50} height={50} className="shrink-0" />
            <div className="grid gap-2">
              <h3 className="text-gray-900 font-medium text-lg">{title}</h3>
              <p className="text-gray-500 text-sm lg:text-base">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
