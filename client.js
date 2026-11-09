window.__ModuleLoader__.load({
	id: "@local/dsh-cross-session",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const ROLE_RE = /^(队长|总监|经理|worker)\s*[｜|]/u;
		const ROLE_NAMES = { "队长": "leader", "总监": "director", "经理": "manager", "worker": "worker" };
		const COLORS = {
			leader: "#ffb454",
			director: "#a084ff",
			manager: "#35e0ff",
			worker: "#38e8b0",
		};
		const svg = (body) => `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
		const ICONS = {
			leader: svg('<path d="M2.2 11.2 3.1 4.9l3.1 2.6L8 3.7l1.8 3.8 3.1-2.6.9 6.3z"/><path d="M3 13.4h10"/>'),
			director: svg('<path d="m8 1.9 4.7 2.7L8 7.3 3.3 4.6z"/><path d="m3.3 7.6 4.7 2.7 4.7-2.7"/><path d="m3.3 10.6 4.7 2.7 4.7-2.7"/>'),
			manager: svg('<path d="m8 1.8 5.2 5.2L8 12.2 2.8 7z"/><circle cx="8" cy="7" r="1.4"/>'),
			worker: svg('<circle cx="8" cy="8" r="2.2"/><path d="M8 1.7v2M8 12.3v2M1.7 8h2M12.3 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M12.5 3.5l-1.4 1.4M4.9 11.1l-1.4 1.4"/>'),
		};

		const NS = "cross-session";
		const zh = { "badge.aria": "{role}角色" };
		const en = { "badge.aria": "{role} role" };

		const css = `
.dsh-role-badge{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;margin-right:5px;vertical-align:-2px;flex:none;opacity:.92;pointer-events:none}
.dsh-role-badge svg{display:block}
.dsh-role-badge[data-role="leader"]{color:${COLORS.leader}}
.dsh-role-badge[data-role="director"]{color:${COLORS.director}}
.dsh-role-badge[data-role="manager"]{color:${COLORS.manager}}
.dsh-role-badge[data-role="worker"]{color:${COLORS.worker}}
`;

		function roleFromTitle(text) {
			const match = ROLE_RE.exec(String(text ?? "").trim());
			if (match === null) return undefined;
			return ROLE_NAMES[match[1]];
		}

		function decorateRow(row) {
			const spans = [...row.querySelectorAll(":scope > span")];
			const title = spans.find((span) => roleFromTitle(span.textContent) !== undefined);
			if (title == null) {
				for (const badge of row.querySelectorAll(".dsh-role-badge")) badge.remove();
				return;
			}
			const role = roleFromTitle(title.textContent);
			const existing = title.querySelector(":scope > .dsh-role-badge");
			if (existing != null && existing.dataset.role === role) return;
			if (existing != null) existing.remove();
			const badge = document.createElement("span");
			badge.className = "dsh-role-badge";
			badge.dataset.role = role;
			badge.innerHTML = ICONS[role];
			badge.setAttribute("aria-hidden", "true");
			badge.title = role === "leader" ? "队长" : role === "director" ? "总监" : role === "manager" ? "经理" : "worker";
			title.insertBefore(badge, title.firstChild);
		}

		function decorateAll() {
			for (const row of document.querySelectorAll('[data-row-key^="session:"]')) decorateRow(row);
		}

		const inject = ["locale"];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "cross-session:role-locale");
			if (typeof document === "undefined") return;
			const tagId = "@local/dsh-cross-session/role-badges.css";
			if (document.querySelector(`style[data-plugin-css="${tagId}"]`) === null) {
				const style = document.createElement("style");
				style.dataset.plugin = "@local/dsh-cross-session";
				style.dataset.pluginCss = tagId;
				style.textContent = css;
				document.head.appendChild(style);
			}
			let frame = 0;
			const schedule = () => {
				if (frame !== 0) return;
				frame = requestAnimationFrame(() => {
					frame = 0;
					decorateAll();
				});
			};
			const observer = new MutationObserver(schedule);
			observer.observe(document.body, { childList: true, subtree: true, characterData: true });
			decorateAll();
			ctx.effect(() => () => {
				observer.disconnect();
				if (frame !== 0) cancelAnimationFrame(frame);
				for (const badge of document.querySelectorAll(".dsh-role-badge")) badge.remove();
			}, "cross-session:role-badges");
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
