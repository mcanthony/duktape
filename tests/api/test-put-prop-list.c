
static duk_ret_t test_1(duk_context *ctx) {
	duk_prop_list_entry props[] = {
		DUK_PROP_NUMBER("test", 123.456),
		DUK_PROP_NUMBER("meaningOfLife", 42.0),
		DUK_PROP_END()
	};

	duk_push_object(ctx);
	duk_put_prop_list(ctx, -1, props);
	duk_eval_string(ctx, "(function (v) { print(Duktape.enc('jx', v)); })");
	duk_dup(ctx, 0);
	duk_call(ctx, 1);
	duk_pop(ctx);
	duk_pop(ctx);

	printf("final top: %ld\n", (long) duk_get_top(ctx));
	return 0;
}

void test(duk_context *ctx) {
	TEST_SAFE_CALL(test_1);
}
