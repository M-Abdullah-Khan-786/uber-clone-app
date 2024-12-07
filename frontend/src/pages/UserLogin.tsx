const UserLogin = () => {
  return (
    <>
      <div className="p-7">
        <form action="">
          <h3 className="text-xl mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            required
            type="email"
            placeholder="example@gmail.com"
          />
          <h3 className="text-xl mb-2">What's your password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full border text-lg placeholder:text-base"
            required
            type="password"
            placeholder="********"
          />
          <button  className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base">Login</button>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
